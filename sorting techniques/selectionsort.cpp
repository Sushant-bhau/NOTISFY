#include<iostream>
using namespace std;

void selectionsort(int arr[],int n){
    int min;
    for(int i =0;i<n;i++){
        min =i;
        for(int j =i+1;j<n;j++){
            if(arr[j]<arr[min]){
                min = j;
            }

            if(min!=i){
                arr[min]=arr[min]^arr[i];
                arr[i]= arr[min]^arr[i];
                arr[min]=arr[min]^arr[i];
            }
        }
    }
}

int main(){
    int n=5;
    int arr[] =  {1,4,5,6,0};
    selectionsort(arr,n);

for(int i =0;i<n;i++){
    cout<<arr[i]<<" ";

}
return 0;

    
}
