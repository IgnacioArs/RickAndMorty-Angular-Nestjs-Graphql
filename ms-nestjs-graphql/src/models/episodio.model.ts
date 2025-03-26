import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Episodio {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    air_date: string;

    @Field()
    episode: string;

    @Field(() => [String])
    characters: string[];

    @Field()
    url: string;

    @Field()
    created: string;
}