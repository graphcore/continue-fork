import { BaseContextProvider } from "..";
import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
  ContextSubmenuItem,
  LoadSubmenuItemsArgs,
} from "../..";
import { getBasename, getLastNPathParts } from "../../util";
import { retrieveContextItemsFromEmbeddings } from "../retrieval";

class FolderContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "folder",
    displayTitle: "Folders",
    description: "Type to search",
    type: "submenu",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras
  ): Promise<ContextItem[]> {
    return retrieveContextItemsFromEmbeddings(extras, this.options, query);
  }
  async loadSubmenuItems(
    args: LoadSubmenuItemsArgs
  ): Promise<ContextSubmenuItem[]> {
    const folders = await args.ide.listFolders();
    return folders.map((folder) => {
      return {
        id: folder,
        title: getBasename(folder),
        description: getLastNPathParts(folder, 2),
      };
    });
  }
}

export default FolderContextProvider;
