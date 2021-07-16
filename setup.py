from setuptools import setup
import pathlib
# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

setup(
    name = 'readme-preview',
    description = 'jupyter extension for previewing readme.md files',
    version = '0.4.1',
    keyword="nbextension, jupyter, extension, readme, markdown",
    long_description=README,
    long_description_content_type="text/markdown",
    author='Vikram Soni',
    author_email='vikram9880@gmail.com',
    url='https://github.com/vikramsoni2/readme-preview',
    packages=['readme-preview'],
    include_package_data=True,
     )