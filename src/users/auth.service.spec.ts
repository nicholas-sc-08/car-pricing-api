import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('Auth Service', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    const users: User[] = [];

    beforeEach(async () => {
        fakeUsersService = {
            find: (email: string) => {
                const filtredUsers = users.filter(user => user.email == email);
                return Promise.resolve(filtredUsers);
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 9999), email, password } as User;
                users.push(user);
                return Promise.resolve(user);
            },
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
        await service.signup('dsfsdfsdf@gmail.com', '1234567');
        try {
            await expect(service.signup('dsfsdfsdf@gmail.com', '1234567')).rejects.toThrow(BadRequestException)
        } catch (error) {

        }
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(service.signin('asdasdasdmn@gmail.com', '1234555')).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        await service.signup('email@gmail.com', '1234567');

        await expect(service.signin('email@gmail.com', 'tedt')).rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async () => {
        await service.signup('123@gmail.com', '1234567')

        const user = await service.signin('123@gmail.com', '1234567');
        expect(user).toBeDefined();
    });
});