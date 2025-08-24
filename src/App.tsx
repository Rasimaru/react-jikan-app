import Layout from './components/layout/Layout';
import { useState } from 'react';
import Modal from './components/forms/Modal';
import UncontrolledForm from './components/forms/UncontroledForm';
import HookForm from './components/forms/HookForm';
import CardItem from './components/forms/CardItem';

type SubmittedData = {
  id: number;
  name: string;
  email: string;
  picture?: string;
  country: string;
};

function App() {
  const [isControlledOpen, setControlledOpen] = useState(false);
  const [isUncontrolledOpen, setUncontrolledOpen] = useState(false);

  const [submittedData, setSubmittedData] = useState<SubmittedData[]>([]);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  const handleFormSubmit = (data: Omit<SubmittedData, 'id'>, close: () => void) => {
    const id = Date.now();
    setSubmittedData((prev) => [...prev, { ...data, id }]);
    setHighlightId(id);
    close();

    setTimeout(() => setHighlightId(null), 10000);
  };

  return (
    <Layout>
      <div className="flex gap-5">
        <button
          className="inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300"
          onClick={() => setControlledOpen(true)}
        >
          Controlled
        </button>
        <button
          className="inline-flex items-center bg-amber-500 text-black border-0 py-1.5 px-5 focus:outline-none hover:bg-amber-300 hover:cursor-pointer rounded font-semibold duration-300"
          onClick={() => setUncontrolledOpen(true)}
        >
          Uncontrolled
        </button>

        {isControlledOpen && (
          <Modal isOpen={isControlledOpen} onClose={() => setControlledOpen(false)}>
            <HookForm onSubmit={(data) => handleFormSubmit(data, () => setControlledOpen(false))} />
          </Modal>
        )}

        {isUncontrolledOpen && (
          <Modal isOpen={isUncontrolledOpen} onClose={() => setUncontrolledOpen(false)}>
            <UncontrolledForm
              onSubmit={(data) => handleFormSubmit(data, () => setUncontrolledOpen(false))}
            />
          </Modal>
        )}
      </div>

      <div className="flex gap-4 text-black text-left">
        {submittedData.map((item) => (
          <div
            key={item.id}
            className={`rounded shadow ${item.id === highlightId ? 'bg-yellow-200 border border-yellow-500' : 'bg-neutral-100'}`}
          >
            <CardItem item={item} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default App;
