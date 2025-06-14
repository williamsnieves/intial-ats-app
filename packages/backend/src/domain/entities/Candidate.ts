export enum CandidateStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLACKLISTED = "BLACKLISTED",
}

export interface CandidateProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  skills: string[];
  experience: number;
  location?: string;
  salary?: number;
  status: CandidateStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Candidate {
  private readonly _id: string;
  private _email: string;
  private _firstName: string;
  private _lastName: string;
  private _phone?: string;
  private _resumeUrl?: string;
  private _linkedinUrl?: string;
  private _skills: string[];
  private _experience: number;
  private _location?: string;
  private _salary?: number;
  private _status: CandidateStatus;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CandidateProps) {
    this._id = props.id;
    this._email = props.email;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._phone = props.phone;
    this._resumeUrl = props.resumeUrl;
    this._linkedinUrl = props.linkedinUrl;
    this._skills = props.skills;
    this._experience = props.experience;
    this._location = props.location;
    this._salary = props.salary;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;

    this.validate();
  }

  // Getters
  get id(): string {
    return this._id;
  }
  get email(): string {
    return this._email;
  }
  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
  get phone(): string | undefined {
    return this._phone;
  }
  get resumeUrl(): string | undefined {
    return this._resumeUrl;
  }
  get linkedinUrl(): string | undefined {
    return this._linkedinUrl;
  }
  get skills(): string[] {
    return [...this._skills];
  }
  get experience(): number {
    return this._experience;
  }
  get location(): string | undefined {
    return this._location;
  }
  get salary(): number | undefined {
    return this._salary;
  }
  get status(): CandidateStatus {
    return this._status;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business methods
  updateProfile(
    props: Partial<
      Pick<
        CandidateProps,
        "firstName" | "lastName" | "phone" | "location" | "salary"
      >
    >
  ): void {
    if (props.firstName) this._firstName = props.firstName;
    if (props.lastName) this._lastName = props.lastName;
    if (props.phone !== undefined) this._phone = props.phone;
    if (props.location !== undefined) this._location = props.location;
    if (props.salary !== undefined) this._salary = props.salary;

    this._updatedAt = new Date();
    this.validate();
  }

  updateSkills(skills: string[]): void {
    this._skills = [...skills];
    this._updatedAt = new Date();
  }

  updateExperience(years: number): void {
    if (years < 0) {
      throw new Error("Experience cannot be negative");
    }
    this._experience = years;
    this._updatedAt = new Date();
  }

  activate(): void {
    this._status = CandidateStatus.ACTIVE;
    this._updatedAt = new Date();
  }

  deactivate(): void {
    this._status = CandidateStatus.INACTIVE;
    this._updatedAt = new Date();
  }

  blacklist(): void {
    this._status = CandidateStatus.BLACKLISTED;
    this._updatedAt = new Date();
  }

  isActive(): boolean {
    return this._status === CandidateStatus.ACTIVE;
  }

  // Validation
  private validate(): void {
    if (!this._email || !this.isValidEmail(this._email)) {
      throw new Error("Invalid email address");
    }

    if (!this._firstName || this._firstName.trim().length === 0) {
      throw new Error("First name is required");
    }

    if (!this._lastName || this._lastName.trim().length === 0) {
      throw new Error("Last name is required");
    }

    if (this._experience < 0) {
      throw new Error("Experience cannot be negative");
    }

    if (this._salary !== undefined && this._salary < 0) {
      throw new Error("Salary cannot be negative");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Serialization
  toJSON(): CandidateProps {
    return {
      id: this._id,
      email: this._email,
      firstName: this._firstName,
      lastName: this._lastName,
      phone: this._phone,
      resumeUrl: this._resumeUrl,
      linkedinUrl: this._linkedinUrl,
      skills: [...this._skills],
      experience: this._experience,
      location: this._location,
      salary: this._salary,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  // Simple UUID generator for now - in production you'd use a proper UUID library
  static create(
    props: Omit<CandidateProps, "id" | "createdAt" | "updatedAt">
  ): Candidate {
    const now = new Date();
    return new Candidate({
      ...props,
      id:
        "candidate_" +
        Date.now().toString(36) +
        Math.random().toString(36).substr(2),
      createdAt: now,
      updatedAt: now,
    });
  }
}
