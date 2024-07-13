interface DatePickerProps {
  active: boolean;
}
const DatePicker = ({ active }: DatePickerProps) => {
  return <div> {active ? 'ACTIVE' : 'NO ACTIVE'}</div>;
};
export default DatePicker;
