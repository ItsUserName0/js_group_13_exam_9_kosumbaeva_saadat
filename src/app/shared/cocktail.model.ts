export class Cocktail {
  constructor(public id: string,
              public name: string,
              public imageUrl: string,
              public type: string,
              public description: string,
              public ingredients: [{ ingName: string, ingAmount: number, ingUnit: string }],
              public instructions: string) {
  }
}
