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
  it ('check value 0', () => {
    const pipe = new EpochDatePipe();
    expect(pipe.transform("/Date(0)/")).toEqual(new Date(0));
  });
  it ('check value -1000', () => {
    const pipe = new EpochDatePipe();
    expect(pipe.transform("/Date(-1000)/")).toEqual(new Date(-1000*1000));
  });
  it ('check value 1000', () => {
    const pipe = new EpochDatePipe();
    expect(pipe.transform("/Date(1000)/")).toEqual(new Date(1000*1000));
  });
  it ('check value 1000.5', () => {
    const pipe = new EpochDatePipe();
    expect(pipe.transform("/Date(1000.5)/")).toEqual(new Date(1000.5*1000));
  });
});
