export type BudgetItemArray = {name: string, price: number | null, id: number}[];

export interface BudgetAPIResponse {
	id: number,
	budget: number,
	userName: string,
	items: BudgetItemArray
}
