// import { Button } from "@/components/ui/button";
// import ToolTipComponent from "@/components/utility/TooltipComponent";
// import { BiExpandAlt } from "react-icons/bi";
// import { MdLeaderboard } from "react-icons/md";



// export default function Leaderboard() {
//     return <div
//         ref={spectatorChatRef}
//         key="leaderboard"
//         className={cn(
//             'p-0 z-40 rounded-xl transition-all',
//             'duration-300 ease-in-out',
//             'border border-neutral-200 dark:border-neutral-700 bg-light-base dark:bg-neutral-900',
//             'shadow-2xl',
//             isLeaderBoardExpanded
//                 ? 'fixed right-0 rounded-r-none w-full max-w-[32vw] h-full border-r-0 border-t-0'
//                 : 'absolute bottom-22 right-15 w-[26rem] h-[40rem] rounded-br-none',
//         )}
//     >
//         <div className="relative h-full flex flex-col pb-1">
//             <div className='flex justify-between items-center px-7 py-4 border-b'>
//                 <div className='flex items-center gap-x-3 text-dark-base dark:text-light-base '>
//                     <MdLeaderboard className="" style={{ width: '28px', height: '28px' }} />
//                     <div className='text-base '>
//                         Leaderboard
//                     </div>
//                 </div>
//                 <ToolTipComponent content="Click to expand">
//                     <div>
//                         <Button
//                             className="text-dark-base dark:text-dark-base cursor-pointer dark:bg-neutral-600/30 "
//                             variant={'ghost'}
//                             onClick={() => setIsLeaderBoardExpanded(prev => !prev)}
//                         >
//                             <BiExpandAlt className="dark:text-light-base" strokeWidth={0.5} />
//                         </Button>
//                     </div>
//                 </ToolTipComponent>
//             </div>
//             <div>

//             </div>
//             <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
//                 <div className="min-h-full flex flex-col justify-end">
//                     {(messages[selectedUser.id] || []).map((message) => (
//                         <SpectatorMessageItem
//                             key={message.id}
//                             message={message}
//                             isUser={message.sender === 'user'}
//                             avatarUrl={selectedUser.avatar}
//                         />
//                     ))}
//                     <div ref={bottomRef} />
//                 </div>
//             </div>
//             {/* <SpectatorChatInput onSendMessage={handleSendMessage} /> */}
//         </div>
//     </div>
// }