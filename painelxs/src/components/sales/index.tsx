import { CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Sales() {
  return (
    <Card className="flex-1 ">
    <CardHeader className="flex items-center justify-center">
        <div className="flex items-center justify-center">
        <CardTitle className="text-lg sm:text-xl text-gray-800">
         Últimos clientes
        </CardTitle>
        <CircleDollarSign className="ml-auto w-4 h-4"/>
        </div>
        <CardDescription>
          Novos clientes nas últimas 24 horas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/gabrielcafens.png"/>
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Mandando bala no front</p>
            <span className="text-[12px] sm:text-sm text-gray-400">gabriel.cafe@ufrpe.br</span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/Bruno-spj.png"/>
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Mandando bala no front</p>
            <span className="text-[12px] sm:text-sm text-gray-400">Bruno-spj@gmail.com</span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/07061992.png"/>
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Mandando bala no figma</p>
            <span className="text-[12px] sm:text-sm text-gray-400">Betogato@gmail.com</span>
          </div>
        </article>

      </CardContent>
    </Card>
  )
}
