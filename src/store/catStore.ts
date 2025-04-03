import axios from "axios";
import { API_URL, API_KEY } from "../api";
import { createStore } from "zustand-q";

export interface Cat {
  id: string;
  name: string;
}

interface CatState {
  cats: Cat[];
}

type TData<T> = { data: T };

export const useCatStore = createStore({
  initialData: {
    cats: [],
  } as CatState,
  actions: (set) => ({
    clearCats: () => set({ cats: [] }),
    addCats: (name: string) => set({ cats: [{ id: "123", name }] }),
  }),
  queries: {
    getCatList: {
      queryFn: async () =>
        await axios.get<TData<Cat[]>>(`${API_URL}`, {
          headers: { "x-api-key": API_KEY.list },
        }),
      onStore: (data, set) => set({ cats: data.data.data }),
      onStart: () => console.log("Đang query danh sách mèo..."),
      onSuccess: (data: Cat[]) =>
        console.log("Query danh sách thành công!", data),
      onError: (error: unknown) =>
        console.log((error as Error).message || "Lỗi khi query danh sách"),
      onFinish: () => console.log("Hoàn thành query danh sách:"),
    },
    getCatDetail: {
      queryFn: async ({ id }: { id: string }) =>
        await axios.get<TData<Cat>>(`${API_URL}/${id}`, {
          headers: { "x-api-key": API_KEY.get },
        }),
      onStore: (data, set) =>
        set((state) => ({ cats: [...state.cats, data.data.data] })),
      onStart: () => console.log("Đang query chi tiết mèo..."),
      onSuccess: (data: Cat) => console.log("Query chi tiết thành công!", data),
      onError: (error: unknown) =>
        console.log((error as Error).message || "Lỗi khi query chi tiết"),
      onFinish: () => console.log("Hoàn thành query chi tiết:"),
    },
  },
  mutations: {
    addCat: {
      mutationFn: async (variables: { name: string }) => {
        const response = await axios.post<TData<Cat>>(`${API_URL}`, variables, {
          headers: { "x-api-key": API_KEY.create },
        });
        return response.data.data;
      },
      onStore: (data, set) => set((state) => ({ cats: [...state.cats, data] })),
      onStart: () => console.log("Đang thêm mèo..."),
      onSuccess: (data: Cat) => console.log("Thêm mèo thành công!", data),
      onError: (error: unknown) =>
        console.log((error as Error).message || "Lỗi khi thêm mèo"),
      onFinish: () => console.log("Hoàn thành thêm mèo:"),
    },
    updateCat: {
      mutationFn: async (variables: { id: string; name: string }) => {
        const response = await axios.put<TData<Cat>>(
          `${API_URL}/${variables.id}`,
          { name: variables.name },
          {
            headers: { "x-api-key": API_KEY.update },
          }
        );
        return response.data.data;
      },
      onStore: (data, set) =>
        set((state) => ({
          cats: state.cats.map((cat) => (cat.id === data.id ? data : cat)),
        })),
      onStart: () => console.log("Đang cập nhật mèo..."),
      onSuccess: (data: Cat) => console.log("Cập nhật mèo thành công!", data),
      onError: (error: unknown) =>
        console.log((error as Error).message || "Lỗi khi cập nhật mèo"),
      onFinish: () => console.log("Hoàn thành cập nhật mèo:"),
    },
    deleteCat: {
      mutationFn: async (variables: { id: string }) => {
        const response = await axios.delete<Cat>(`${API_URL}/${variables.id}`, {
          headers: { "x-api-key": API_KEY.delete },
        });
        return response.data;
      },
      onStore: (data, set) =>
        set((state) => ({
          cats: state.cats.filter((cat) => cat.id !== data.id) as Cat[],
        })),
      onStart: () => console.log("Đang xóa mèo..."),
      onSuccess: (data: Cat) => console.log("Xóa mèo thành công!", data),
      onError: (error: unknown) =>
        console.log((error as Error).message || "Lỗi khi xóa mèo"),
      onFinish: () => console.log("Hoàn thành xóa mèo:"),
    },
  },
});
