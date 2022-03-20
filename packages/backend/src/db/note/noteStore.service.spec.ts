import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NoteStoreService } from './noteStore.service';
import { Note, NoteContents } from './note.schema';
import { Model } from 'mongoose';

const mockNote = {
  name: 'Note #1',
  value: 'Value #1',
  type: NoteContents.PLAIN,
  house: null,
};

describe('NoteStoreService', () => {
  let service: NoteStoreService;
  let model: Model<Note>;

  const notesArray = [
    {
      name: 'Note #1',
      value: 'Value #1',
      type: NoteContents.PLAIN,
      house: null,
    },
    {
      name: 'Note #2',
      value: 'Value #2',
      type: NoteContents.PLAIN,
      house: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteStoreService,
        {
          provide: getModelToken('Note'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockNote),
            constructor: jest.fn().mockResolvedValue(mockNote),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NoteStoreService>(NoteStoreService);
    model = module.get<Model<Note>>(getModelToken('Note'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all notes', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(notesArray),
    } as never);
    const notes = await service.findAll();
    expect(notes).toEqual(notesArray);
  });
  it('should insert a new note', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Note #1',
        value: 'Value #1',
        type: NoteContents.PLAIN,
        house: null,
      }),
    );
    const newNote = await service.create({
      name: 'Note #1',
      value: 'Value #1',
      type: NoteContents.PLAIN,
      house: null,
    });
    expect(newNote).toEqual(mockNote);
  });
});
