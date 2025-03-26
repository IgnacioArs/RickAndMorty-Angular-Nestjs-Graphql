import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Origen {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    type: string;

    @Field()
    dimension: string;

    @Field(() => [String])
    residents: string[];

    @Field()
    url: string;

    @Field()
    created: string;
}