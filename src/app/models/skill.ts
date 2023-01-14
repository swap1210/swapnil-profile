export class Skill {
  constructor(
    public logo: string,
    public proficiency: number,
    public sequence: number,
    public title: string,
    public description?: string,
    public period?: string
  ) {}
}
