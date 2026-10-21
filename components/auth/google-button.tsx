import { SiGoogle } from "@icons-pack/react-simple-icons"
import { entrarConGoogle } from "@/lib/actions/auth"

export function GoogleButton({ callbackUrl }: { callbackUrl?: string }) {
    return (
        <form action={entrarConGoogle}>
            <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/panel"} />
            <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 border border-border bg-white px-6 py-3.5 text-sm font-medium hover:border-foreground transition-colors"
            >
                <SiGoogle className="w-4 h-4" />
                Continuar con Google
            </button>
        </form>
    )
}
