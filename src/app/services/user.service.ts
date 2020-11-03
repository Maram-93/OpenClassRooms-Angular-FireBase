import { User } from '../models/User.model';
import {Subject} from 'rxjs';

export class UserService {
  //private users: User[];
  userSubject = new Subject<User[]>();

private users: User[] = [
    new User('Will', 'Alexander', 'will@will.com', 'jus d\'orange', ['coder', 'boire du café'])
];
  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
