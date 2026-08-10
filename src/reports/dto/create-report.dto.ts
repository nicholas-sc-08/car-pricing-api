import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
    @IsNumber() @IsPositive()
    price!: number;

    @IsString() @IsNotEmpty()
    make!: string;

    @IsString() @IsNotEmpty()
    model!: string;

    @IsNumber() @IsPositive() @Min(1930) @Max(2050)
    year!: number;

    @IsLongitude() @IsNotEmpty()
    lng!: string;

    @IsLatitude() @IsNotEmpty()
    lat!: number;

    @IsNumber() @IsNotEmpty() @Min(0) @Max(1000000)
    mileage!: number;
}