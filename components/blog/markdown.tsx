import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

// "¿Cuánto cuesta?" -> "cuanto-cuesta": ancla para los subtítulos.
const ancla = (texto: string) =>
    texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

const textoDe = (hijos: React.ReactNode): string =>
    Array.isArray(hijos) ? hijos.map(textoDe).join("") : typeof hijos === "string" ? hijos : ""

// El contenido lo escribe un administrador, pero igual: sin HTML crudo (react-markdown lo ignora) y
// los enlaces externos llevan rel="noopener noreferrer"; los internos usan next/link.
const componentes: Components = {
    h2: ({ children }) => (
        <h2 id={ancla(textoDe(children))} className="mt-12 mb-4 scroll-mt-28 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 id={ancla(textoDe(children))} className="mt-8 mb-3 scroll-mt-28 text-xl font-semibold text-foreground">
            {children}
        </h3>
    ),
    p: ({ children }) => <p className="my-5 text-lg leading-[1.8] text-foreground/85">{children}</p>,
    ul: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 text-lg leading-[1.8] text-foreground/85 marker:text-muted-foreground">{children}</ul>,
    ol: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 text-lg leading-[1.8] text-foreground/85 marker:text-muted-foreground">{children}</ol>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-2 border-foreground pl-6 text-foreground [&>p]:my-0 [&>p]:text-xl [&>p]:font-light">{children}</blockquote>
    ),
    hr: () => <hr className="my-12 border-border" />,
    a: ({ href = "", children }) =>
        href.startsWith("/") || href.startsWith("#") ? (
            <Link href={href} className="font-medium text-primary underline underline-offset-4 hover:opacity-80">
                {children}
            </Link>
        ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4 hover:opacity-80">
                {children}
            </a>
        ),
    img: ({ src, alt }) =>
        typeof src === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ""} loading="lazy" className="my-8 w-full rounded-xl border border-border" />
        ) : null,
    table: ({ children }) => (
        <div className="my-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-base">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-neutral-100">{children}</thead>,
    th: ({ children }) => <th className="px-4 py-3 font-medium text-foreground">{children}</th>,
    td: ({ children }) => <td className="border-t border-border px-4 py-3 text-foreground/85">{children}</td>,
    code: ({ children }) => <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em]">{children}</code>,
}

export function Markdown({ texto }: { texto: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={componentes}>
            {texto}
        </ReactMarkdown>
    )
}

// Índice del artículo: los "## " del Markdown.
export function indiceDe(texto: string): { id: string; titulo: string }[] {
    return texto
        .split("\n")
        .filter((l) => /^##\s+/.test(l))
        .map((l) => {
            const titulo = l.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim()
            return { id: ancla(titulo), titulo }
        })
}
