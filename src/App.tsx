import { useState } from "react";
import { Cat, useCatStore } from "./store/catStore";
import { useStore } from "zustand-q";
import TestComponent from "./components/TestComponent";

const App = () => {
  const [name, setName] = useState("");
  const [catId, setCatId] = useState("");

  const {
    addCats,
    clearCats,
    getCatList,
    getCatDetail,
    addCat,
    updateCat,
    deleteCat,
  } = useCatStore();

  const cats = useCatStore((state) => state.cats);
  const cats2 = useCatStore<Cat[]>("cats");

  const [count, setCount] = useStore<number>("count", 0);

  const { isPending, refetch } = getCatList({
    enabled: true,
  });
  const { mutate: createCat, isPending: isCreating } = addCat();
  const { mutate: editCat, isPending: isUpdating } = updateCat();
  const { mutate: removeCat, isPending: isDeleting } = deleteCat();

  const handleAddCat = () => {
    if (name) {
      createCat({ name });
      setName("");
    }
  };

  const handleUpdateCat = () => {
    if (catId && name) {
      editCat({ id: catId, name });
      setName("");
      setCatId("");
    }
  };

  const handleDeleteCat = (id: string) => {
    removeCat({ id });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Cat Manager</h1>
      <p>{count}</p>
      <TestComponent />
      <button onClick={() => setCount((prev) => prev + 1)}>Test count</button>
      <div style={{ marginBottom: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cat name"
          style={{ marginRight: 10 }}
        />
        <input
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
          placeholder="Cat ID (for update)"
          style={{ marginRight: 10 }}
        />
        <button onClick={handleAddCat} disabled={isCreating}>
          {isCreating ? "Adding..." : "Add Cat"}
        </button>
        <button
          onClick={handleUpdateCat}
          disabled={isUpdating}
          style={{ marginLeft: 10 }}
        >
          {isUpdating ? "Updating..." : "Update Cat"}
        </button>
        <button
          onClick={() => refetch()}
          disabled={isPending}
          style={{ marginLeft: 10 }}
        >
          {isPending ? "Loading..." : "Fetch Cats"}
        </button>
        <button onClick={clearCats} style={{ marginLeft: 10 }}>
          Clear Cats
        </button>
        <button onClick={() => addCats("Lyly")} disabled={isCreating}>
          Add offline cat
        </button>
      </div>
      <div>
        <h2>Cats List ({cats.length})</h2>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {cats.map((cat) => (
              <li key={cat.id}>
                {cat.name} (ID: {cat.id})
                <button
                  onClick={() => handleDeleteCat(cat.id)}
                  disabled={isDeleting}
                  style={{ marginLeft: 10 }}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
