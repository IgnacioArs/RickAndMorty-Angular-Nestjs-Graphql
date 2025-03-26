import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Origin {
    @Field()
    name: string;

    @Field()
    url: string;
}

@ObjectType()
export class Location {
    @Field()
    name: string;

    @Field()
    url: string;
}

@ObjectType()
export class Personaje {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    status: string;

    @Field()
    species: string;

    @Field()
    type: string;

    @Field()
    gender: string;

    @Field(() => Origin)
    origin: Origin;

    @Field(() => Location)
    location: Location;

    @Field()
    image: string;

    @Field(() => [String])
    episode: string[];

    @Field()
    url: string;

    @Field()
    created: string;
}
