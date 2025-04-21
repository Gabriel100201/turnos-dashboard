import Link from "next/link"
import { Building2, Mail, Phone } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-secondary-100 border-t w-full">
      <div className="mx-auto px-4 md:px-6 py-8 md:py-12 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2">
              <Building2 className="w-6 h-6" />
              <span className="font-semibold text-lg">Dirección de Gobierno Digital</span>
            </div>
            <Image src="/Logo-Sj.svg" alt="Logo Gobierno de San Juan" width={100} height={24} className="mt-4" />
          </div>

          <div className="md:col-span-1">
            <h3 className="mb-4 font-medium text-sm">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  CIDI
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Gobierno
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="mb-4 font-medium text-sm">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4" />
                <span>+54 (264) 1234567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@gobierno.gob.ar</span>
              </li>
            </ul>
          </div>

        </div>

        <Separator className="bg-secondary-300 my-8" />

        <div className="flex md:flex-row flex-col justify-between items-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Gobierno de San Juan.
          </p>
        </div>
      </div>
    </footer>
  )
}

