import { formatDate } from '../utils/formatters';

export default function NewsCard({ news }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/60">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-slate-100">Latest tech news (HackerNews)</h2>
        <span className="text-[11px] text-slate-500">Top {news?.length || 0} stories</span>
      </div>

      {news?.length ? (
        <ul className="divide-y divide-slate-800 text-xs">
          {news.map((item) => (
            <li key={item.id} className="py-2 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <a
                  href={item.url || `https://news.ycombinator.com/item?id=${item.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="line-clamp-2 text-slate-100 hover:text-sky-300 transition"
                >
                  {item.title}
                </a>
                <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-500">
                  <span>by {item.by}</span>
                  <span>• score {item.score}</span>
                  <span>• {item.type}</span>
                </div>
              </div>
              <div className="mt-1 md:mt-0 md:ml-3 text-[10px] text-slate-500 whitespace-nowrap">
                {formatDate(item.time)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-slate-500">
          News will load automatically once you run your first analysis.
        </p>
      )}
    </section>
  );
}

