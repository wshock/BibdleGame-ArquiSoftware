import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { compareCharacters } from 'src/utils/compare-characters.util';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async getCharacterOfTheDay() {
    const today = new Date();
    const dateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    let daily = await this.prisma.dailyCharacter.findUnique({
      where: { date: dateOnly },
      include: { character: true },
    });

    if (daily) return daily.character;

    // Seleccionar uno aleatorio
    const count = await this.prisma.character.count();
    const randomIndex = Math.floor(Math.random() * count);
    const character = await this.prisma.character.findMany({
      skip: randomIndex,
      take: 1,
    });

    // Guardar el nuevo personaje del día
    daily = await this.prisma.dailyCharacter.create({
      data: {
        date: dateOnly,
        characterId: character[0].id,
      },
      include: { character: true },
    });

    return daily.character;
  }

  async compareCharacter(characterOfPlayer: any) {
    const characterOfTheDay = await this.getCharacterOfTheDay();
    console.log('Character of the Day:', characterOfTheDay);

    return compareCharacters(characterOfPlayer, characterOfTheDay);
  }

  async getDailyCharacterForGuessMode() {
    const today = new Date();
    const dateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // Guarda/consulta en la tabla DailyGameCharacter (o redis o config)
    let daily = await this.prisma.dailyCharacter.findFirst({
      where: { date: dateOnly, mode: 'GUESS' },
      include: { character: true },
    });

    if (daily) return daily.character;

    // Seleccionar uno aleatorio
    const count = await this.prisma.character.count();
    const randomIndex = Math.floor(Math.random() * count);
    const character = await this.prisma.character.findMany({
      skip: randomIndex,
      take: 1,
    });

    // Guardar el nuevo personaje del día
    daily = await this.prisma.dailyCharacter.create({
      data: {
        date: dateOnly,
        characterId: character[0].id,
        mode: 'GUESS',
      },
      include: { character: true },
    });

    return daily.character;
  }

  async getClue() {
    const character = await this.getDailyCharacterForGuessMode();
    return {
      clue: character.phrase,
      name: character.name,
    };
  }

  async verifyGuess(guess: string) {
    const character = await this.getDailyCharacterForGuessMode();
    const correct = character.name.toLowerCase() === guess.toLowerCase();

    return correct ? 'total coincidence' : 'no coincidence';
  }
}
