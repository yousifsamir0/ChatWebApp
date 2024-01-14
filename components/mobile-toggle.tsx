import { Ghost, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import SidePanel from "./sidepanel/SidePanel";
import { Button } from "./ui/button";

function MobileToggle() {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <div className="flex w-full">
                    <SidePanel />
                </div>
            </SheetContent>

        </Sheet>
    )
}

export default MobileToggle