export class RecursoModel {
    idResource: number;
    title?: string;
    link?: string;
    description?: string;
    children: RecursoModel[]
    image_url: string;
}
