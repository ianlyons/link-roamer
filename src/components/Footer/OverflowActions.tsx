import React from 'react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { MoreIcon } from '../icons/MoreIcon'
import { BookmarkIcon, CodeIcon, SheetIcon } from '../icons'
import BookmarkModal from './BookmarkModal'

const OverflowActions = () => {
  const [showBookmark, setShowBookmark] = React.useState(false)

  return (
    <React.Fragment>
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<MoreIcon />} />
        <MenuList>
          <MenuItem
            fontSize="sm"
            icon={<BookmarkIcon />}
            onClick={() => setShowBookmark(true)}
          >
            Bookmark links
          </MenuItem>
          <MenuDivider />
          <MenuItem fontSize="sm" icon={<CodeIcon />}>
            Export as JSON
          </MenuItem>
          <MenuItem fontSize="sm" icon={<SheetIcon />}>
            Export as CSV
          </MenuItem>
          <MenuDivider />
          <MenuItem fontSize="sm" icon={<CodeIcon />}>
            Copy as JSON
          </MenuItem>
          <MenuItem fontSize="sm" icon={<SheetIcon />}>
            Copy as CSV
          </MenuItem>
        </MenuList>
      </Menu>
      <BookmarkModal state={showBookmark} setState={setShowBookmark} />
    </React.Fragment>
  )
}

export default OverflowActions
