export const parseDateTime = (dateTimestr) =>
{
    return new Date(dateTimestr.replace(' ', 'T'));
}