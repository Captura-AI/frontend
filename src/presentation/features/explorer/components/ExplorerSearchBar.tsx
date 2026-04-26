"use client";

interface ExplorerSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: (v: string) => void;
  placeholder: string;
}

export function ExplorerSearchBar({ value, onChange, onSearch, placeholder }: ExplorerSearchBarProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <div className="pb-6">
      <div className="max-w-[1280px] mx-auto px-10">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-[14px] bg-bg-soft border border-line rounded-full transition-[border-color] duration-[250ms] focus-within:border-ink"
          style={{ padding: "14px 14px 14px 24px" }}
        >
          {/* Search icon */}
          <svg
            className="w-5 h-5 text-ink-faint shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none font-serif text-[22px] tracking-[-0.01em] text-ink placeholder:text-ink-faint placeholder:italic py-[6px]"
            aria-label="Search moments"
          />

          {/* Go button */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-ink text-bg-soft rounded-full text-[13px] font-medium transition-opacity hover:opacity-80"
            style={{ padding: "12px 22px" }}
          >
            Explore
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M1 6.5h10M7 2l4.5 4.5L7 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
