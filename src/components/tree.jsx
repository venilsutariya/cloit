'use client';

import React, { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const Tree = ({ items, className }) => {
    console.log({items});

    const [expandedItems, setExpandedItems] = useState(() => {
        const initialState = {};
        const setExpanded = (items) => {
            items.forEach((item) => {
                initialState[item.id] = true;
                if (item.children) {
                    setExpanded(item.children);
                }
            });
        };
        setExpanded(items);
        return initialState;
    });

    const toggleAll = (expand) => {
        const newExpandedState = {};
        const updateState = (items) => {
            items.forEach((item) => {
                newExpandedState[item.id] = expand;
                if (item.children) {
                    updateState(item.children);
                }
            });
        };
        updateState(items);
        setExpandedItems(newExpandedState);
    };

    return (
        <div className={cn('select-none w-full max-w-full overflow-x-auto', className)}>
            <div className="flex flex-wrap gap-4 pb-4 font-sans">
                <Button className="text-sm sm:text-base whitespace-nowrap" onClick={() => toggleAll(true)}>
                    Expand All
                </Button>
                <Button 
                    className="text-sm sm:text-base whitespace-nowrap" 
                    variant="outline" 
                    onClick={() => toggleAll(false)}
                >
                    Collapse All
                </Button>
            </div>
            <div className="pl-3 sm:pl-5 min-w-[280px]">
                {items.map((item, index) => (
                    <TreeItem
                        key={item.id}
                        {...item}
                        expandedItems={expandedItems}
                        setExpandedItems={setExpandedItems}
                        isLast={index === items.length - 1}
                        level={0}
                    />
                ))}
            </div>
        </div>
    );
};

const TreeItem = ({ 
    id, 
    label, 
    isPlus, 
    children, 
    expandedItems, 
    setExpandedItems, 
    isLast,
    level
}) => {
    const isExpanded = expandedItems[id];
    const hasChildren = children && children.length > 0;

    const toggleExpand = () => {
        setExpandedItems((prev) => ({ ...prev, [id]: !isExpanded }));
    };

    return (
        <div className="relative">
            <div className="relative flex items-center group">
                <div 
                    className="absolute w-3 sm:w-4 h-px bg-gray-300" 
                    style={{ left: '-12px' }} 
                />
                
                <div className="flex items-center py-2 min-w-0">
                    {hasChildren && (
                        <ChevronRight
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform cursor-pointer",
                                isExpanded && "rotate-90"
                            )}
                            onClick={toggleExpand}
                        />
                    )}
                    {!hasChildren && <div className="w-4 shrink-0" />}
                    <span 
                        className="ml-1 cursor-pointer select-none truncate"
                        onClick={hasChildren ? toggleExpand : undefined}
                    >
                        {label}
                    </span>
                    {isPlus && (
                        <span className="ml-2 flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[blue] text-white">
                            <Plus size={16} />
                        </span>
                    )}
                </div>
            </div>

            {hasChildren && isExpanded && (
                <div className="relative ml-3 sm:ml-4 pl-3 sm:pl-4 border-l border-gray-300 dark:border-gray-700">
                    {children.map((child, index) => (
                        <TreeItem
                            key={child.id}
                            {...child}
                            expandedItems={expandedItems}
                            setExpandedItems={setExpandedItems}
                            isLast={index === children.length - 1}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tree;