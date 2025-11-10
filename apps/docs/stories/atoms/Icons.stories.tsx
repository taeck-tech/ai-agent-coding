import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AddIcon } from "@acme/ui";
import { ArrowDownIcon } from "@acme/ui";
import { SearchIcon } from "@acme/ui";
import { CloseIcon } from "@acme/ui";
import { FavoriteFillIcon } from "@acme/ui";
import { FavoriteOutlineIcon } from "@acme/ui";
import { CheckIcon } from "@acme/ui";

// Text formatting icons
import { TextAlignLeftIcon } from "@acme/ui";
import { TextAlignCenterIcon } from "@acme/ui";
import { TextAlignRightIcon } from "@acme/ui";
import { TextAlignJustifyIcon } from "@acme/ui";
import { TextBoldIcon } from "@acme/ui";
import { TextItalicIcon } from "@acme/ui";
import { TextUnderlinedIcon } from "@acme/ui";
import { TextH1Icon } from "@acme/ui";
import { TextH2Icon } from "@acme/ui";
import { TextH3Icon } from "@acme/ui";
import { TextH4Icon } from "@acme/ui";
import { TextH5Icon } from "@acme/ui";
import { TextListBulletedIcon } from "@acme/ui";
import { TextListNumberedIcon } from "@acme/ui";

// Other icons
import { TextLinkIcon } from "@acme/ui";
import { SelectColorsIcon } from "@acme/ui";

// New icons
import { AssignmentIcon } from "@acme/ui";
import { AssignmentAddIcon } from "@acme/ui";
import { BrushIcon } from "@acme/ui";
import { CalendarTodayIcon } from "@acme/ui";
import { DateRangeIcon } from "@acme/ui";
import { DownloadIcon } from "@acme/ui";
import { DvrIcon } from "@acme/ui";
import { ImageArrowUpIcon } from "@acme/ui";
import { ListAltIcon } from "@acme/ui";
import { PaletteIcon } from "@acme/ui";
import { PatientListIcon } from "@acme/ui";
import { RequestPageIcon } from "@acme/ui";
// import { UploadIcon } from "@acme/ui";

const meta = {
  title: "Atoms/Icons",

  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "danger", "warning", "success", "deactivated"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof AddIcon>;

export default meta;
type Story = StoryObj<typeof AddIcon>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="space-y-8">
        {/* Basic Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Icons</h3>
          <div className="grid grid-cols-6 gap-2">
            <div className="flex flex-col items-center gap-1">
              <AddIcon {...args} />
              <span className="text-[12px] text-gray-500">AddIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ArrowDownIcon {...args} />
              <span className="text-[12px] text-gray-500">ArrowDownIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CloseIcon {...args} />
              <span className="text-[12px] text-gray-500">CloseIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <SearchIcon {...args} />
              <span className="text-[12px] text-gray-500">SearchIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FavoriteFillIcon {...args} />
              <span className="text-[12px] text-gray-500">
                FavoriteFillIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FavoriteOutlineIcon {...args} />
              <span className="text-[12px] text-gray-500">
                FavoriteOutlineIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckIcon {...args} />
              <span className="text-[12px] text-gray-500">CheckIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextLinkIcon {...args} />
              <span className="text-[12px] text-gray-500">TextLinkIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <SelectColorsIcon {...args} />
              <span className="text-[12px] text-gray-500">
                SelectColorsIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <AssignmentIcon {...args} />
              <span className="text-[12px] text-gray-500">AssignmentIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <AssignmentAddIcon {...args} />
              <span className="text-[12px] text-gray-500">
                AssignmentAddIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BrushIcon {...args} />
              <span className="text-[12px] text-gray-500">BrushIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CalendarTodayIcon {...args} />
              <span className="text-[12px] text-gray-500">
                CalendarTodayIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <DateRangeIcon {...args} />
              <span className="text-[12px] text-gray-500">DateRangeIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              {/* <UploadIcon {...args} /> */}
              <span className="text-[12px] text-gray-500">UpIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <DownloadIcon {...args} />
              <span className="text-[12px] text-gray-500">DownloadIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <DvrIcon {...args} />
              <span className="text-[12px] text-gray-500">DvrIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ImageArrowUpIcon {...args} />
              <span className="text-[12px] text-gray-500">
                ImageArrowUpIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ListAltIcon {...args} />
              <span className="text-[12px] text-gray-500">ListAltIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <PaletteIcon {...args} />
              <span className="text-[12px] text-gray-500">PaletteIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <PatientListIcon {...args} />
              <span className="text-[12px] text-gray-500">PatientListIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RequestPageIcon {...args} />
              <span className="text-[12px] text-gray-500">RequestPageIcon</span>
            </div>
          </div>
        </div>

        {/* Text Alignment Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Text Alignment Icons</h3>
          <div className="grid grid-cols-6 gap-2">
            <div className="flex flex-col items-center gap-1">
              <TextAlignLeftIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextAlignLeftIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextAlignCenterIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextAlignCenterIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextAlignRightIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextAlignRightIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextAlignJustifyIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextAlignJustifyIcon
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <TextBoldIcon {...args} />
              <span className="text-[12px] text-gray-500">TextBoldIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextItalicIcon {...args} />
              <span className="text-[12px] text-gray-500">TextItalicIcon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextUnderlinedIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextUnderlinedIcon
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <TextH1Icon {...args} />
              <span className="text-[12px] text-gray-500">TextH1Icon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextH2Icon {...args} />
              <span className="text-[12px] text-gray-500">TextH2Icon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextH3Icon {...args} />
              <span className="text-[12px] text-gray-500">TextH3Icon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextH4Icon {...args} />
              <span className="text-[12px] text-gray-500">TextH4Icon</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextH5Icon {...args} />
              <span className="text-[12px] text-gray-500">TextH5Icon</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <TextListBulletedIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextListBulletedIcon
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TextListNumberedIcon {...args} />
              <span className="text-[12px] text-gray-500">
                TextListNumberedIcon
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
