import { useRef } from "react";
import { Bold, Italic, Link2, List } from "lucide-react";
import { sanitizeHtml } from "../lib/sanitizeHtml";

interface RichTextFieldProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
}

// A deliberately small rich-text field — bold/italic/bulleted list/link
// only — rather than a full WYSIWYG framework. Sanitized (allow-list) on
// every change, so nothing here can execute a script.
export function RichTextField({ value, onChange, label }: RichTextFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  function exec(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  }

  function handleInput() {
    if (!ref.current) return;
    onChange(sanitizeHtml(ref.current.innerHTML));
  }

  function handleLink() {
    const url = window.prompt("Link URL");
    if (url) exec("createLink", url);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-navy">{label}</span>}
      <div className="rounded-lg border border-hairline">
        <div className="flex items-center gap-1 border-b border-hairline p-1.5">
          <ToolbarButton onClick={() => exec("bold")} icon={Bold} label="Bold" />
          <ToolbarButton onClick={() => exec("italic")} icon={Italic} label="Italic" />
          <ToolbarButton onClick={() => exec("insertUnorderedList")} icon={List} label="Bulleted list" />
          <ToolbarButton onClick={handleLink} icon={Link2} label="Link" />
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          className="min-h-32 px-3 py-2 text-sm text-foreground outline-none [&_a]:text-brand-blue [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5"
        />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  icon: typeof Bold;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-7 items-center justify-center rounded-md text-graphite transition-colors hover:bg-surface hover:text-navy"
    >
      <Icon className="size-3.5" />
    </button>
  );
}
