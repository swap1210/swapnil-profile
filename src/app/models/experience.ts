export class Experience {
  constructor(
    public sequence: number,
    public logo: string,
    public organization: string,
    public title: string,
    public tasks?: string[],
    public period?: string
  ) {}
}
