import { NextRequest, NextResponse } from 'next/server';

class UnprocessableEntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
  }
}

const errorHandler = (handler: (req: NextRequest) => Promise<NextResponse>) => {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (err) {
      if (err instanceof UnprocessableEntityError) {
        return NextResponse.json({ success: false, message: err.message }, { status: 422 });
      } else {
        return NextResponse.json(
          { success: false, message: 'Internal Server Error' },
          { status: 500 }
        );
      }
    }
  };
};

export { errorHandler, UnprocessableEntityError };
