#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<vector<int>> dataset(50,vector<int> (10,0));
    int trans = 50;
    int minsup = 6;
    vector<int> support(10,0);
    cout<<"   I1 I2 I3 I4 I5 I6 I7 I8 I9 I10"<<endl;
    for(int i=0;i<trans;i++){
        cout<<"T"<<i+1<<" ";
        if(i<9){
            cout<<" ";
        }
        for(int j=0;j<10;j++){
            int num = rand()%10;
            if(num>5){
                dataset[i][j] = 1;
                support[j]++;
            }else{
                dataset[i][j] = 0 ;
            }
            cout<<dataset[i][j]<<"  ";
        }
        cout<<endl;
    }
    cout<<"\nSupport of single items:"<<endl;
    cout<<"I1  I2  I3  I4  I5  I6  I7  I8  I9  I10"<<endl;
    for(int i=0;i<10;i++){
        cout<<support[i]<<"  ";
    }
    cout<<"\nmin-sup is assumed to be "<<minsup<<endl;
    cout<<"Frequent item set for k=1 :"<<endl;
    vector<int> L1;
    for(int i=0;i<10;i++){
        if(support[i]>minsup){
            L1.push_back(i);
            cout<<"I"<<i+1<<" "<<support[i]<<endl;
        }
    }

    vector<pair<int,int>> L2;
    vector<int> ans1;
    cout<<"Frequent item set for k=2 :"<<endl;
    for(int i=0;i<L1.size()-1;i++){
        for(int j=i+1;j<L1.size();j++){
            int count1=0;
            for(int k=0;k<trans;k++){
                if(dataset[k][L1[i]] && dataset[k][L1[j]]){
                    count1++;
                }
            }
            if(count1>minsup){
                L2.push_back(make_pair(L1[i],L1[j]));
                ans1.push_back(count1);
                cout<<"I"<<(L1[i]+1)<<" I"<<(L1[j]+1)<<": "<<count1<<endl;
            }
        }
    }


    cout<<"Frequent item set for k=3 :"<<endl;
    vector<vector<vector<int> > > L3(10, vector<vector<int> >(10, vector<int>(10)));
    vector<pair<int,pair<int,int>>> ans;
    for(int i=0;i<L2.size();i++){
        for(int j=0;j<L1.size();j++){
            int count2=0;
            int x = L2[i].first;
            int y = L2[i].second;
            int z = L1[j];
            if(L3[x][y][z]==0 && L3[x][z][y]==0 && L3[z][x][y]==0 &&L3[z][y][x]==0 && L3[y][z][x]==0){
                for(int k=0;k<trans;k++){

                    if(x != z && y != z){
                        if(dataset[k][x] && dataset[k][y] && dataset[k][z]){
                                count2++;

                        }
                    }
                }
                if(count2>minsup){
                    L3[x][y][z]=1;
                    ans.push_back(make_pair(x,make_pair(y,z)));

                    cout<<"I"<<(x+1)<<" I"<<(y+1)<<" I"<<(z+1)<<": "<<count2<<endl;
                }
            }


        }
    }

    float minConf = 1.7;
    int counter = 0;
    cout<<"min_confidence is assumed to be: "<<minConf<<endl;
    cout<<"Rules generated       Confidence count"<<endl;
    for(int i=0;i<L2.size() && counter<5;i++){
        float curConf = ((float)(support[L2[i].first] + support[L2[i].second] - ans1[i])/support[L2[i].first]);
        if(curConf>=minConf){
            counter++;
            cout<<"I"<<L2[i].first+1<<"-> I"<<L2[i].second+1<<":             "<<curConf<<endl;
        }
    }

    return 0;
}

