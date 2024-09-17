import React, { useState } from "react";

import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar";
import { Sheet , SheetContent , SheetDescription , SheetHeader , SheetTitle , SheetTrigger } from "@/components/ui/sheet";

const UserSheet = ({ user }) => 
{
    const [ sheetOpen , setSheetOpen ] = useState(false);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                    <AvatarFallback>...</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <Avatar>
                        <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                        <AvatarFallback>...</AvatarFallback>
                    </Avatar>
                    <SheetTitle>{user.username}</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default UserSheet;