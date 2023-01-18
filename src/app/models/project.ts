export class Project {
  constructor(
    public sequence: number,
    public logo: string,
    public summary: string,
    public title: string,
    public tasks?: string[]
  ) {}
}
