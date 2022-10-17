export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const numberToCommaSeperatedPrice = (num: Number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
