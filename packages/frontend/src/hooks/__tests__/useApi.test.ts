import { getUrl, substitutePathParams } from '../useApi';

describe('UseApi Hook: Path Parameter Substitution', () => {
  it('Should substitute the Path parameters with numbers', () => {
    const result = substitutePathParams('/api/v1/{id}/{house}/info', {
      house: 4,
      id: 1,
    });
    expect(result).toBe('/api/v1/1/4/info');
  });

  it('Should substitute the Path parameters with strings', () => {
    const result = substitutePathParams('/api/v1/{id}/{house}/info', {
      house: '4',
      id: '1',
    });
    expect(result).toBe('/api/v1/1/4/info');
  });

  it('Should ignore excess path parameters', () => {
    const result = substitutePathParams('/api/v1/{id}/{house}/info', {
      house: '4',
      id: '1',
      extra: 'extra',
    });
    expect(result).toBe('/api/v1/1/4/info');
  });

  it('Should throw on missing path parameters', () => {
    expect(() =>
      substitutePathParams('/api/v1/{id}/{house}/info', {
        house: '4',
      }),
    ).toThrow();
  });

  it('Should have no effect on a url without path params', () => {
    const result = substitutePathParams('/api/v1/info', {
      house: '4',
      id: '1',
      extra: 'extra',
    });
    expect(result).toBe('/api/v1/info');
  });
});

describe('UseApi Hook: Base URL Prepend', () => {
  const OLD = process.env.REACT_APP_ENDPOINT;

  beforeAll(() => {
    process.env.REACT_APP_ENDPOINT = 'https://api.example.com';
  });

  afterAll(() => {
    process.env.REACT_APP_ENDPOINT = OLD;
  });

  it('Should prepend the base url to the url when the URL starts with a slash', () => {
    const result = getUrl('/api/v1/ping');
    expect(result).toBe('https://api.example.com/api/v1/ping');
  });

  it('Should prepend the base url to the url when the URL does not start with a slash', () => {
    const result = getUrl('api/v1/ping');
    expect(result).toBe('https://api.example.com/api/v1/ping');
  });
});
