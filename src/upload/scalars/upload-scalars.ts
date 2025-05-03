import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { Scalar } from '@nestjs/graphql';
import { ReadStream } from 'fs';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => ReadStream;
}

@Scalar('Upload') // ✅ Do not reference FileUpload here
export class UploadScalar extends GraphQLScalarType {
  constructor() {
    super({
      name: 'Upload',
      description: 'The `Upload` scalar type represents a file upload.',
      parseValue(value: unknown): Promise<FileUpload> {
        return value as Promise<FileUpload>;
      },
      serialize(): never {
        throw new Error('Upload serialization is not supported.');
      },
      parseLiteral(ast: ValueNode): never {
        if (ast.kind === Kind.STRING) {
          throw new Error('Upload literal unsupported.');
        }
        throw new Error('Upload value must be provided via variable.');
      },
    });
  }
}

export const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue(value: unknown): Promise<FileUpload> {
    return value as Promise<FileUpload>;
  },
  serialize(): never {
    throw new Error('Upload serialization is not supported.');
  },
  parseLiteral(ast: ValueNode): never {
    throw new Error('Upload literal unsupported; use variables.');
  },
});
