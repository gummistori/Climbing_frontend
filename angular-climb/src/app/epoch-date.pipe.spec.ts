import { EpochDatePipe } from './epoch-date.pipe';

describe('EpochDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EpochDatePipe();
    expect(pipe).toBeTruthy();
  });
  it ('check null', () => {
    const pipe = new EpochDatePipe();
    expect(pipe.transform(null)).toBeNull();
  });
  it ('check value', () => {
    const pipe = new EpochDatePipe();
    expect(pipe.transform("/Date(0)/")).toBe(new Date(0));
  });
});
