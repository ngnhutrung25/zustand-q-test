# zustand-q-test

![License](https://img.shields.io/badge/license-MIT-blue.svg)

`zustand-q-test` is a demo project built with React and Vite to test and showcase the features of the `zustand-q` library. It implements a "Cat Manager" application with functionalities like adding, updating, deleting, and fetching a list of cats using queries and mutations from `zustand-q`.

## Purpose

- Test the functionality of `zustand-q` in a real-world application.
- Provide an example of how to use `zustand-q` with Zustand and React.
- Facilitate debugging and further development of `zustand-q`.

## Technologies Used

- **React**: UI library.
- **Vite**: Fast and lightweight build tool.
- **TypeScript**: Type safety.
- **zustand-q**: Async state management library (linked from the main project).
- **Zustand**: Global state management.
- **Axios**: HTTP requests (mocked or real).

---

## Installation

### Prerequisites

- Node.js >= 18.x
- Yarn (recommended, as the project uses Yarn)

### Step 1: Clone the Project

```bash
git clone https://github.com/yourusername/zustand-q-test.git
cd zustand-q-test
```

### Step 2: Install Dependencies

Install required packages:

```bash
yarn install
```

### Step 3: Link `zustand-q`

Link the `zustand-q` library from its source:

1. In the `zustand-q` directory:
   ```bash
   cd /Users/nguyennhutrung/Documents/workspace/zustand-q
   yarn build
   yarn link
   ```
2. In the `zustand-q-test` directory:
   ```bash
   yarn link zustand-q
   ```

### Step 4: Configure API (Optional)

- If you have a real API, update `src/api.ts` with the actual URL and API keys.
- Otherwise, the project uses mocked data in `src/store/catStore.ts`.

---

## Running the Project

Start the development server:

```bash
yarn dev
```

- Open your browser at `http://localhost:5173` to view the demo.

---

## Usage

### Interface

The app displays a "Cat Manager" with the following features:

- **Count**: A simple counter using `useStore` from `zustand-q`.
- **Add Cat**: Add a new cat by entering a name and clicking "Add Cat".
- **Update Cat**: Update a cat’s name by entering its ID and a new name, then clicking "Update Cat".
- **Fetch Cats**: Load the cat list (mocked or from an API).
- **Delete Cat**: Remove a cat from the list.
- **Clear Cats**: Clear the entire cat list.
- **Add Offline Cat**: Add a static cat (Lyly) without an API.

### Example Workflow

1. Click "Fetch Cats" to load the initial cat list.
2. Enter a name (e.g., "Mimi") and click "Add Cat" to add a new cat.
3. Enter a cat’s ID and a new name, then click "Update Cat" to edit.
4. Click "Delete" next to a cat to remove it.
5. Click "Test count" to increment the counter.

---

## Project Structure

```
zustand-q-test/
├── src/
│   ├── api.ts          # API configuration (URL and keys)
│   ├── App.tsx         # Main application component
│   ├── store/
│   │   ├── catStore.ts # Zustand-Q store for cat management
│   ├── TestApp.tsx     # Simple test component
│   ├── main.tsx        # Vite entry point
├── package.json        # Project configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

---

## Debugging and Development

- **Debugging**: Open the browser console to view logs from `onStart`, `onSuccess`, `onError`, and `onFinish` in `catStore.ts`.
- **Modifying `zustand-q`**: Edit code in `/Users/nguyennhutrung/Documents/workspace/zustand-q`, run `yarn build`, and changes will reflect in this test project due to the link.

---

## Unlinking

After testing, unlink `zustand-q`:

1. In `zustand-q-test`:
   ```bash
   yarn unlink zustand-q
   yarn install
   ```
2. In `zustand-q`:
   ```bash
   yarn unlink
   ```

---

## Notes

- This project is for testing purposes only and not intended for production use.
- To use a real API, update `src/api.ts` and ensure the API returns data in the expected format.

---

## Contributing

To contribute to this test project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).
