import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/environment";
import { connectDatabase } from "./infrastructure/database/PrismaClient";
import { PrismaCandidateRepository } from "./infrastructure/repositories/PrismaCandidateRepository";
import { CandidateUseCases } from "./application/use-cases/CandidateUseCases";
import { CandidateController } from "./presentation/controllers/CandidateController";
import { createCandidateRoutes } from "./presentation/routes/candidateRoutes";

class Server {
  private app: express.Application;
  private candidateController!: CandidateController;

  constructor() {
    this.app = express();
    this.setupDependencies();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupDependencies(): void {
    // Repository layer
    const candidateRepository = new PrismaCandidateRepository();

    // Application layer
    const candidateUseCases = new CandidateUseCases(candidateRepository);

    // Presentation layer
    this.candidateController = new CandidateController(candidateUseCases);
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet());

    // CORS configuration
    this.app.use(
      cors({
        origin: config.corsOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Request logging in development
    if (config.nodeEnv === "development") {
      this.app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
      });
    }
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
      });
    });

    // API routes
    this.app.use(
      "/api/candidates",
      createCandidateRoutes(this.candidateController)
    );

    // 404 handler
    this.app.use("*", (req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
      });
    });
  }

  private setupErrorHandling(): void {
    // Global error handler
    this.app.use(
      (
        error: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.error("Global Error Handler:", error);

        // Zod validation errors
        if (error.name === "ZodError") {
          return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.message,
          });
        }

        // Prisma errors
        if (error.message.includes("Unique constraint")) {
          return res.status(409).json({
            success: false,
            message: "Resource already exists",
          });
        }

        if (error.message.includes("Record to update not found")) {
          return res.status(404).json({
            success: false,
            message: "Resource not found",
          });
        }

        // Default error response
        return res.status(500).json({
          success: false,
          message:
            config.nodeEnv === "development"
              ? error.message
              : "Internal server error",
        });
      }
    );
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      await connectDatabase();

      // Start server
      this.app.listen(config.port, () => {
        console.log(`🚀 Server running on port ${config.port}`);
        console.log(`📊 Environment: ${config.nodeEnv}`);
        console.log(`🔗 Health check: http://localhost:${config.port}/health`);
        console.log(`📡 API base URL: http://localhost:${config.port}/api`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new Server();
server.start().catch(console.error);
