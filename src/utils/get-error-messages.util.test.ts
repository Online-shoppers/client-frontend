/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

import { getErrorMessages } from './get-error-messages.util';

const errorsArray = ['Error 1', 'Error 2'];

const defaultError = new Error('Some default error');

const errorsArrayAxiosError = new AxiosError('Error from backend', '404', undefined, undefined, {
  status: 404,
  statusText: 'Not found',
  headers: {},
  config: {} as any,
  request: {},
  data: {
    errors: errorsArray,
  },
});

const responseMessageAxiosError = new AxiosError(
  'Error from backend',
  '404',
  undefined,
  undefined,
  {
    status: 404,
    statusText: 'Not found',
    headers: {},
    config: {} as any,
    request: {},
    data: {
      message: 'Response error message',
    },
  },
);

const numberResponseMessageAxiosError = new AxiosError(
  'Error from backend',
  '404',
  undefined,
  undefined,
  {
    status: 404,
    statusText: 'Not found',
    headers: {},
    config: {} as any,
    request: {},
    data: {
      message: 5,
    },
  },
);

const emptyResponseAxiosError = new AxiosError('Error from backend', '404', undefined, undefined, {
  status: 404,
  statusText: 'Not found',
  headers: {},
  config: {} as any,
  request: {},
  data: {},
});

const numberMessageDefaultError = new Error(5 as any);
const errorWithoutMessage = new Error();

const emptyAxiosError = new AxiosError('Some axios error');

describe('getErrorMessagesUtil', () => {
  it('handles default errors with string messages', () => {
    try {
      throw defaultError;
    } catch (e) {
      expect(getErrorMessages(e)).toStrictEqual(['Some default error']);
    }
  });

  it('handles default errors with other type messages', () => {
    expect(getErrorMessages(numberMessageDefaultError)).toStrictEqual(['5']);
  });

  it('returns null when default error without message passed', () => {
    try {
      throw errorWithoutMessage;
    } catch (e) {
      expect(getErrorMessages(e)).toBe(null);
    }
  });

  describe('with AxiosError', () => {
    it('returns array of string errors from response.errors array', () => {
      expect(getErrorMessages(errorsArrayAxiosError)).toStrictEqual(errorsArray);
    });

    it('returns array of response.message', () => {
      expect(getErrorMessages(responseMessageAxiosError)).toStrictEqual(['Response error message']);
    });

    it('returns null when only string message provided', () => {
      expect(getErrorMessages(emptyAxiosError)).toBe(null);
    });

    it('returns null when axios response message is not of type string', () => {
      expect(getErrorMessages(numberResponseMessageAxiosError)).toBe(null);
    });

    it('returns null when axios response is empty', () => {
      expect(getErrorMessages(emptyResponseAxiosError)).toBe(null);
    });
  });
});
