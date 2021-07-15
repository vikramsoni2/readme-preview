### Project Structure for MLflow integrated ML Projects

This cli tool generates the following directory structure for quickstart ML projects

installaton:  

    pip install aihubcli

example use:  

    aihubcli create myProject
    

    myProject/
    │
    ├── input/
    │   ├── raw/                <-- Raw data here
    │   ├── interim/            <-- Any intermediate data, to pause and continue experiments
    │   └── processed/          <-- Processed data ready for ML pipeline
    │
    ├── output/
    │   ├── models/             <-- Model pickle or model weights stored here
    │   ├── artifacts/          <-- Serialized artifacts like LabelEncoder, Vectorizer etc
    │   ├── figures /           <-- All plots and visualizations goes here
    │   └── results/            <-- If the results needs to be stored for review, save here
    │
    ├── notebooks/              <-- All notebooks and experiments resides here
    │   ├── eda_plots.ipynb     <-- ┌───────────────────────────────────────────┐
    │   ├── ml_rnn.ipynb        <-- │ free to name notebooks any way you prefer │
    │   └── ml_seq2seq.ipynb    <-- └───────────────────────────────────────────┘
    │
    ├── src/                    <-- Final program, with training and prediction pipeline
    │   ├── __init__.py         <-- Makes src a Python module                    
    │   ├── preprocess.py       <-- code related to preprocessing the data and storing it in input/processed/
    │   ├── model.py            <-- model definition here, can be used in train or prediction
    │   ├── train.py            <-- all code related to training model goes here
    │   ├── hyperopt.py         <-- hyperparameter optimizations related code
    │   ├── package.py          <-- packaging the trained model with preprocessing logic for MLflow
    │   ├── predict.py          <-- prediction logic, usually loads the model from Mlflow registry and predict
    │   └── server.py           <-- any API interface like Flask etc. Create as needed
    │
    README.md                   <-- Description and instruction about the project
    MLProject                   <-- MLflow project file. If you want to use this directory as MLflow project
    requirements.txt            <-- python dependencies
    config.yml                  <-- configuration key value pairs in yaml format
 