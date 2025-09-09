type HistoryItem = {
  status: string;
  date: string;
};

const steps = ['ordered', 'packed', 'shipped', 'delivered'];

const statusLabel: Record<string, string> = {
  ordered: 'Ordered',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const OrderTimeline = ({ history }: { history: HistoryItem[] }) => {
  return (
    <div className="space-y-6 border-l-2 border-gray-300 pl-4">
      {steps.map((step, index) => {
        const historyItem = history.find((h) => h.status === step);
        const isCompleted = !!historyItem;
        const isCurrent =
          !isCompleted &&
          (index === 0 || history.find((h) => h.status === steps[index - 1]));

        return (
          <div key={step} className="relative pl-6">
            {/* Circle indicator */}
            <div
              className={`absolute left-[-11px] top-1 w-4 h-4 rounded-full border-2
                ${
                  isCompleted
                    ? 'bg-green-500 border-green-600'
                    : isCurrent
                      ? 'bg-yellow-400 border-yellow-500'
                      : 'bg-gray-300 border-gray-400'
                }`}
            ></div>

            {/* Step content */}
            <p className="font-medium capitalize">{statusLabel[step]}</p>
            <p className="text-sm text-gray-500 mt-1">
              {isCompleted
                ? formatDate(historyItem!.date)
                : isCurrent
                  ? 'In Progress...'
                  : 'Pending'}
            </p>
          </div>
        );
      })}
    </div>
  );
};
