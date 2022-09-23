import os
import zipfile


def create_assets_map(assets_path: [os.PathLike, str, None] = r"assets") -> tuple:
    if assets_path is None:
        assets_path = os.getcwd()
    assets_path = assets_path if os.path.isdir(assets_path) else os.getcwd()
    files_map = list()
    for dirpath, dirnames, filenames in os.walk(assets_path):
        for filepath in filenames:
            files_map.append(os.path.join(dirpath, filepath))
    assets_map_path = os.path.join(os.path.dirname(assets_path), "assets.map")
    with open(assets_map_path, 'wb') as afile:
        afile.write("\n".join(files_map).encode())
    return assets_path, files_map


def create_assets_zip(assets_path: [os.PathLike, str, None] = r"assets") -> str:
    assets_path, files_map = create_assets_map(assets_path)
    assets_zip_path = os.path.join(os.path.dirname(assets_path), "assets.zip")
    with zipfile.ZipFile(assets_zip_path, "w", zipfile.ZIP_DEFLATED, True, 9) as assets_zip:
        for f in files_map:
            assets_zip.write(f)
    return os.path.abspath(assets_zip_path)


if __name__ == '__main__':
    result = create_assets_zip()
    print(result)
