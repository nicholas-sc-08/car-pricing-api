import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {

    @IsString() @IsNotEmpty()
    make!: string;

    @IsString() @IsNotEmpty()
    model!: string;

    // colocando o value ele retorna apenas o valor que estamos mexendo, ja o obj retorna todo o objeto validado pelo dto
    @Transform(({ value }) => parseInt(value))
    @IsNumber() @IsPositive() @Min(1930) @Max(2050)
    year!: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude() @IsNotEmpty()
    lng!: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude() @IsNotEmpty()
    lat!: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber() @IsNotEmpty() @Min(0) @Max(1000000)
    mileage!: number;
}