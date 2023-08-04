import os
import re


def format_md_file(file_path):
    print(file_path)
    with open(file_path, 'r') as f:
        content = f.read()
    pattern = r"（(.*?)）"
    replacement = r"<span class='more'>（\1）</span>"
    content = re.sub(pattern, replacement, content)
    content = content.replace('“', '「')
    content = content.replace('”', '」')
    content = content.replace(',', '，')
    content = content.replace('?', '？')
    content = content.replace(':', '：')
    print(content)
    with open(file_path, 'w') as f:
        f.write(content)


if __name__ == '__main__':
    file_path = os.path.join(
        os.getcwd(), '_posts/2023-08-04-learn-japanese-by-song.md')
    format_md_file(file_path)
