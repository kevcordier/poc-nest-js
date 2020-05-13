export class FilterAstronautDto {
    q?: string;
    firstName?: string
    lastName?: string;
    birthDate?: string;
    grade?: string;
    planet?: {
        id: number
    }
}
