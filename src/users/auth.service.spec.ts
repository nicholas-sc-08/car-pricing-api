import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('Auth Service', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
            findOne: (id: number) => Promise.resolve({ id: 1, email: "user 1" } as User)

        }

        const module = await Test.createTestingModule({
            providers: [AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {

        expect(service).toBeDefined();
    });

    it('creates a new user with salted and hashed password', async () => {
        const user = await service.signup('asdas@gmail.com', '12345');

        expect(user.password).not.toEqual('12345');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with emial that is in use', async () => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '123455' } as User]);
        await expect(service.signup('dsfsdfsdf@gmail.com', '1234567')).rejects.toThrow(BadRequestException)
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(service.signin('asdasdasdmn@gmail.com', '1234555')).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () => Promise.resolve([{ email: 'dfsdfiksdj@gmail.com', password: 'pasdjasaosjkd' } as User]);

        await expect(service.signin('sijsdifsdninjsfom@gmail.com', 'aj9wrwe')).rejects.toThrow(BadRequestException);
    })
});