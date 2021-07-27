import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/books.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find();
  }

  async findById(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: id });
  }

  async create(book: Book): Promise<Book> {
    const newBook = new this.bookModel(book);
    return await newBook.save();
  }

  async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndRemove(id);
  }

  async update(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }
}
